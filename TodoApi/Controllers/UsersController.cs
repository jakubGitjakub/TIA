#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly TodoContext _context;

        public UsersController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsers()
        {
            return await _context.Users.Include(s => s.Id_Addresses).ToListAsync();
        }

        // GET: api/Users/logVerify
        [HttpGet("logVerify/{login}/{password}")]
        public async Task<ActionResult<Users>> GetUsersLogin(string login, string password)
        {
            var users = await _context.Users.Include(s => s.Id_Addresses).FirstOrDefaultAsync(i => i.Login == login);
            if (users == null)
            {
                return NotFound();
            }

            return users;
            //return await _context.Events.Include(s => s.Companies).Include(s => s.Tickets).Where(x => x.Verify_Status == true).ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Users>> GetUsers(long id)
        {
            var users = await _context.Users.Include(s => s.Id_Addresses).FirstOrDefaultAsync(i => i.Id == id);

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }
        
        // GET: api/Users/confirm
        [HttpGet("verify")]
        public async Task<ActionResult<IEnumerable<Users>>> GetUsersByConfirm()
        {
            var users = await _context.Users.Where(x => x.Verify_Status == false).ToListAsync();

            if (users == null)
            {
                return NotFound();
            }

            return users;
        }

        [HttpGet("number")]
        public async Task<ActionResult<long>> GetNextNumber()
        {
            var users = await _context.Users.ToListAsync();
            var id = users.Max(x => x.Id);
            long number = 1;
            number = id + 1;
            return number;
        }

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUsers(long id, Users users)
        {
            if (id != users.Id)
            {
                return BadRequest();
            }
            _context.Entry(users).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UsersExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Users>> PostUsers(Users users)
        {
            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUsers", new { id = users.Id }, users);
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUsers(long id)
        {
            var users = await _context.Users.FindAsync(id);
            if (users == null)
            {
                return NotFound();
            }

            _context.Users.Remove(users);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UsersExists(long id)
        {
            return _context.Users.Any(e => e.Id == id);
        }
    }
}
