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
    public class EventCalendarsController : ControllerBase
    {
        private readonly TodoContext _context;

        public EventCalendarsController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/EventCalendars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventCalendar>>> GetEventCalendar()
        {
            return await _context.EventCalendar.ToListAsync();
        }

        // GET: api/EventCalendars/5
        [HttpGet("{id}")]
        public async Task<ActionResult<EventCalendar>> GetEventCalendar(long id)
        {
            var eventCalendar = await _context.EventCalendar.FindAsync(id);

            if (eventCalendar == null)
            {
                return NotFound();
            }

            return eventCalendar;
        }

        // PUT: api/EventCalendars/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutEventCalendar(long id, EventCalendar eventCalendar)
        {
            if (id != eventCalendar.Id)
            {
                return BadRequest();
            }

            _context.Entry(eventCalendar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!EventCalendarExists(id))
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

        // POST: api/EventCalendars
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<EventCalendar>> PostEventCalendar(EventCalendar eventCalendar)
        {
            _context.EventCalendar.Add(eventCalendar);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetEventCalendar", new { id = eventCalendar.Id }, eventCalendar);
        }

        // DELETE: api/EventCalendars/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEventCalendar(long id)
        {
            var eventCalendar = await _context.EventCalendar.FindAsync(id);
            if (eventCalendar == null)
            {
                return NotFound();
            }

            _context.EventCalendar.Remove(eventCalendar);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool EventCalendarExists(long id)
        {
            return _context.EventCalendar.Any(e => e.Id == id);
        }
    }
}
