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
    public class LoginHistoriesController : ControllerBase
    {
        private readonly TodoContext _context;

        public LoginHistoriesController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/LoginHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<LoginHistory>>> GetLoginHistory()
        {
            return await _context.LoginHistory.ToListAsync();
        }

        // GET: api/LoginHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<LoginHistory>> GetLoginHistory(long id)
        {
            var loginHistory = await _context.LoginHistory.FindAsync(id);

            if (loginHistory == null)
            {
                return NotFound();
            }

            return loginHistory;
        }

        // PUT: api/LoginHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutLoginHistory(long id, LoginHistory loginHistory)
        {
            if (id != loginHistory.Id)
            {
                return BadRequest();
            }

            _context.Entry(loginHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!LoginHistoryExists(id))
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

        // POST: api/LoginHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<LoginHistory>> PostLoginHistory(LoginHistory loginHistory)
        {
            _context.LoginHistory.Add(loginHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLoginHistory", new { id = loginHistory.Id }, loginHistory);
        }

        // DELETE: api/LoginHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLoginHistory(long id)
        {
            var loginHistory = await _context.LoginHistory.FindAsync(id);
            if (loginHistory == null)
            {
                return NotFound();
            }

            _context.LoginHistory.Remove(loginHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool LoginHistoryExists(long id)
        {
            return _context.LoginHistory.Any(e => e.Id == id);
        }
    }
}
