using Malek.Portfolio.Api.Data;
using Malek.Portfolio.Api.Dtos;
using Malek.Portfolio.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Malek.Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/services")]
    public class ServicesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ServicesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Service>>> GetAll()
        {
            var services = await _context.Services.OrderBy(s => s.Order).ToListAsync();
            return Ok(services);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Service>> Create(ServiceDto dto)
        {
            var service = new Service
            {
                Title = dto.Title,
                Description = dto.Description,
                IconKey = dto.IconKey,
                Order = dto.Order
            };
            _context.Services.Add(service);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = service.Id }, service);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Service>> Update(int id, ServiceDto dto)
        {
            var service = await _context.Services.FindAsync(id);
            if (service is null) return NotFound();

            service.Title = dto.Title;
            service.Description = dto.Description;
            service.IconKey = dto.IconKey;
            service.Order = dto.Order;

            await _context.SaveChangesAsync();
            return Ok(service);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var service = await _context.Services.FindAsync(id);
            if (service is null) return NotFound();

            _context.Services.Remove(service);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
