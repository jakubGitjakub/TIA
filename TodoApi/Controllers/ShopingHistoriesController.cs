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
    public class ShopingHistoriesController : ControllerBase
    {
        private readonly TodoContext _context;

        public ShopingHistoriesController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/ShopingHistories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ShopingHistory>>> GetShopingHistory()
        {
            return await _context.ShopingHistory.ToListAsync();
        }

        // GET: api/ShopingHistories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ShopingHistory>> GetShopingHistory(long id)
        {
            var shopingHistory = await _context.ShopingHistory.FindAsync(id);

            if (shopingHistory == null)
            {
                return NotFound();
            }

            return shopingHistory;
        }

        // PUT: api/ShopingHistories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutShopingHistory(long id, ShopingHistory shopingHistory)
        {
            if (id != shopingHistory.Id)
            {
                return BadRequest();
            }

            _context.Entry(shopingHistory).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ShopingHistoryExists(id))
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

        // POST: api/ShopingHistories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<ShopingHistory>> PostShopingHistory(ShopingHistory shopingHistory)
        {
            _context.ShopingHistory.Add(shopingHistory);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetShopingHistory", new { id = shopingHistory.Id }, shopingHistory);
        }

        // DELETE: api/ShopingHistories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteShopingHistory(long id)
        {
            var shopingHistory = await _context.ShopingHistory.FindAsync(id);
            if (shopingHistory == null)
            {
                return NotFound();
            }

            _context.ShopingHistory.Remove(shopingHistory);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ShopingHistoryExists(long id)
        {
            return _context.ShopingHistory.Any(e => e.Id == id);
        }
    }
}
