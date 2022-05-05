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
    public class TicketsController : ControllerBase
    {
        private readonly TodoContext _context;

        public TicketsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Tickets
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tickets>>> GetTickets()
        {
            return await _context.Tickets.Include(s => s.Events).ToListAsync();
        }

        // GET: api/Tickets/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Tickets>> GetTickets(long id)
        {
            var tickets = await _context.Tickets.FindAsync(id);

            if (tickets == null)
            {
                return NotFound();
            }

            return tickets;
        }

        // GET: api/Tickets/Prvy
        [HttpGet("name/{ticketName}")]     
        public async Task<ActionResult<IEnumerable<Tickets>>> GetTicketByName(string ticketName)
        {
            var tickets = await _context.Tickets.Where(x => x.Name == ticketName).ToListAsync();

            if (tickets == null)
            {
                return NotFound();
            }

            return tickets;
        }

        // GET: api/Tickets/user/1
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<Tickets>>> getTicketByUser(long id)
        {
            var tickets = await _context.Tickets.Include(s => s.Events).Where(x => x.User.Id == id).ToListAsync();

            if (tickets == null)
            {
                return NotFound();
            }

            return tickets;
        }

        [HttpGet("number")]
        public async Task<ActionResult<long>> GetNextNumber()
        {
            var tickets = await _context.Tickets.ToListAsync();
            var id = tickets.Max(x => x.Id);
            long number = 1;
            number = id + 1;
            return number;
        }

        // PUT: api/Tickets/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTickets(long id, Tickets tickets)
        {
            if (id != tickets.Id)
            {
                return BadRequest();
            }

            _context.Entry(tickets).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TicketsExists(id))
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

        // POST: api/Tickets
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Tickets>> PostTickets(Tickets tickets)
        {
            var eve = await _context.Events.Include(s => s.Tickets).SingleOrDefaultAsync(s => s.Name == tickets.Events[0].Name);

            if (eve == null)
            {
                eve = new Events();
            }

            eve.Tickets.Add(tickets);
            tickets.Events = null;

            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == tickets.User.Id);
            tickets.User = user;

            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTickets", new { id = tickets.Id }, tickets);
        }

        // DELETE: api/Tickets/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTickets(long id)
        {
            var tickets = await _context.Tickets.FindAsync(id);

            if (tickets == null)
            {
                return NotFound();
            }

            var ticket = await _context.Tickets.Include(e => e.Events).Where(x => x.Id == id).FirstOrDefaultAsync();
            if (ticket != null)
            {
                ticket.Events = null;
            }

            var eventCalendar = await _context.EventCalendar.Include(e => e.Tickets).Where(x => x.Tickets.Id == id).FirstOrDefaultAsync();
            if(eventCalendar != null)
            {
                eventCalendar.Tickets = null;
            }
            
            _context.Tickets.Remove(tickets);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool TicketsExists(long id)
        {
            return _context.Tickets.Any(e => e.Id == id);
        }
    }
}
