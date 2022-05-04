using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        public static Models.Users user = new Models.Users();
        private readonly IConfiguration _configuration;
        private readonly TodoContext _context;


        public AuthController(IConfiguration configuration, TodoContext context)
        {
            _configuration = configuration;
            _context = context;
        }


        [HttpPost("register")]
        public async Task<ActionResult<Models.Users>> Register(UserDto request)
        {
            var result = _context.Users.FirstOrDefault(s => s.Login == request.Login);
            if (result != null)
            {
                return BadRequest();
            }
            else
            {
                var user = new Models.Users();
                CreatePasswordHash(request.Password, out byte[] passwordHash, out byte[] passwordSalt);
                user.Login = request.Login;
                user.PasswordHash = passwordHash;
                user.PasswordSalt = passwordSalt;
                if(request.Role == "Customer")
                    user.Verify_Status = true;
                else
                {
                    user.Verify_Status = false;
                }
                user.Role = request.Role;
                _context.Users.Add(user);
                _context.SaveChanges();
                return Ok(user);
            }
        }

        [HttpPost("login")]
        public async Task<ActionResult<string>> Login(UserDto request)
        {
            var result = _context.Users.FirstOrDefault(s => s.Login == request.Login);
            if (result == null)
            {
                return BadRequest();
            }

            if(!VerifyPasswordHash(request.Password, result.PasswordHash, result.PasswordSalt))
            {
                return BadRequest("Wrong password");
            }

            if(result.Verify_Status == false)
            {
                return BadRequest("Not confirmed account");
            }

            string token = CreateToken(result);
             
            return Ok(new {user = result.Id, userRole = result.Role, token = token });
        }

        private string CreateToken(Models.Users user)
        {
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.Login)
            };

            var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
                "J7WF56mEcQJ7WF56mEcQJ7WF56mEcQJ7WF56mEcQ"));

            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: cred);
                
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }


        private void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac = new HMACSHA512())
            {
                passwordSalt = hmac.Key;
                passwordHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }

        private bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using (var hmac = new HMACSHA512(passwordSalt))
            {
                var computedHash = hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password)); 
                return computedHash.SequenceEqual(passwordHash);
            }
        }
    }
}
