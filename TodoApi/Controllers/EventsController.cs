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
    public class EventsController : ControllerBase
    {
        private readonly TodoContext _context;

        public EventsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Events
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Events>>> GetEvents()
        {
            return await _context.Events.Include(s => s.Companies).Include(s => s.Tickets).ToListAsync();
        }

        // GET: api/Events/verify
        [HttpGet("verifyEvent/events")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEventsVerify()
        {
            return await _context.Events.Include(s => s.Companies).Include(s => s.Tickets).Where(x => x.Verify_Status == true).ToListAsync();
        }

        // GET: api/Events/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Events>> GetEvents(long id)
        {
            var events = await _context.Events.FindAsync(id);

            if (events == null)
            {
                return NotFound();
            }

            return events;
        }

        // GET: api/Events/confirm
        [HttpGet("verify")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEventsByConfirm()
        {
            var events = await _context.Events.Where(x => x.Verify_Status == false).ToListAsync();

            if (events == null)
            {
                return NotFound();
            }

            return events;
        }

        // GET: api/Events/user/1
        [HttpGet("user/{id}")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEventsByUser(long id)
        {
            var events = await _context.Events.Include(s => s.Companies).Where(x => (x.Users.Id == id || x.Access == "Open") && (x.Verify_Status == true)).ToListAsync();

            if (events == null)
            {
                return NotFound();
            }

            return events;
        }

        // GET: api/Events/Prvy
        [HttpGet("name/{eventName}")]
        public async Task<ActionResult<IEnumerable<Events>>> GetEventByName(string eventName)
        {
            var events = await _context.Events.Include(s => s.Tickets).Where(x => x.Name == eventName).ToListAsync();

            if (events == null)
            {
                return NotFound();
            }

            return events;
        }

        [HttpGet("number")]
        public async Task<ActionResult<long>> GetNextNumber()
        {
            var events = await _context.Events.ToListAsync();
            var id = events.Max(x => x.Id);
            long number = 1;
            number = id + 1;
            return number;
        }

        // PUT: api/Events/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEvents(long id, Events events)
        {
            if (id != events.Id)
            {
                return BadRequest();
            }

            _context.Entry(events).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventsExists(id))
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

        // POST: api/Events
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Events>> PostEvents(Events events)
        {
            //company ku ktorej sa viaze event
            var company = await _context.Companies.Include(s => s.Events).SingleOrDefaultAsync(s => s.Name == events.Companies[0].Name);

            if (company == null)
            { 
                company = new Companies(); 
            }

            company.Events.Add(events);
            events.Companies = null;
            
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == events.Users.Id);
            events.Users = user;
            
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEvents", new { id = events.Id }, events);
        }

        // DELETE: api/Events/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEvents(long id)
        {
            var events = await _context.Events.FindAsync(id);
            if (events == null)
            {
                return NotFound();
            }

            _context.Events.Remove(events);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventsExists(long id)
        {
            return _context.Events.Any(e => e.Id == id);
        }
    }
}
