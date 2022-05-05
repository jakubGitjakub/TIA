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
    public class CompaniesController : ControllerBase
    {
        private readonly TodoContext _context;

        public CompaniesController(TodoContext context)
        {
            _context = context;
        }

        // GET: api/Companies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Companies>>> GetCompanies()
        {
            return await _context.Companies.Include(s => s.Events).ToListAsync();
        }

        // GET: api/Companies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Companies>> GetCompanies(long id)
        {
            var companies = await _context.Companies.FindAsync(id);

            if (companies == null)
            {
                return NotFound();
            }

            return companies;
        }

        [HttpGet("number")]
        public async Task<ActionResult<long>> GetNextNumber()
        {
            var companies = await _context.Companies.ToListAsync();
            var id = companies.Max(x => x.Id);
            long number = 1;
            number = id + 1;
            return number;
        }

        // GET: api/Companies/Prva
        [HttpGet("name/{companyName}")]
        public async Task<ActionResult<IEnumerable<Companies>>> GetCompanyByName(string companyName)
        {
            var company = await _context.Companies.Include(s => s.Events).Where(x => x.Name == companyName).ToListAsync();

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // GET: api/Companies/Prva
        [HttpGet("getCompany/{companyName}")]
        public async Task<ActionResult<IEnumerable<Companies>>> GetCompanyByName2(string companyName)
        {
            var company = await _context.Companies.Where(x => x.Name == companyName).ToListAsync();

            if (company == null)
            {
                return NotFound();
            }

            return company;
        }

        // PUT: api/Companies/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCompanies(long id, Companies companies)
        {
            if (id != companies.Id)
            {
                return BadRequest();
            }

            _context.Entry(companies).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CompaniesExists(id))
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

        // POST: api/Companies
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Companies>> PostCompanies(Companies companies)
        {
            _context.Companies.Add(companies);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCompanies", new { id = companies.Id }, companies);
        }

        // DELETE: api/Companies/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCompanies(long id)
        {
            var companies = await _context.Companies.FindAsync(id);
            if (companies == null)
            {
                return NotFound();
            }

            var company = await _context.Companies.Include(e => e.Events).Where(x => x.Id == id).FirstOrDefaultAsync();
            if (company != null)
            {
                company.Events = null;
            }

            var eventCalendar = await _context.EventCalendar.Include(e => e.Company).Where(x => x.Company.Id == id).FirstOrDefaultAsync();
            if (eventCalendar != null)
            {
                eventCalendar.Company = null;
            }

            _context.Companies.Remove(companies);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CompaniesExists(long id)
        {
            return _context.Companies.Any(e => e.Id == id);
        }
    }
}
