using Malek.Portfolio.Api.Data;
using Malek.Portfolio.Api.Dtos;
using Malek.Portfolio.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Malek.Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/contact")]
    public class ContactController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ContactController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<ContactMessage>> Create(ContactMessageCreateDto dto)
        {
            var message = new ContactMessage
            {
                Name = dto.Name,
                Email = dto.Email,
                Message = dto.Message,
                CreatedAtUtc = DateTime.UtcNow
            };
            _context.ContactMessages.Add(message);
            await _context.SaveChangesAsync();
            return Ok(new { title = "تم إرسال رسالتك بنجاح." });
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<ContactMessage>>> GetAll()
        {
            var messages = await _context.ContactMessages
                .OrderByDescending(m => m.CreatedAtUtc)
                .ToListAsync();
            return Ok(messages);
        }

        [HttpPatch("{id}/read")]
        [Authorize]
        public async Task<IActionResult> MarkRead(int id)
        {
            var message = await _context.ContactMessages.FindAsync(id);
            if (message is null) return NotFound();

            message.IsRead = true;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var message = await _context.ContactMessages.FindAsync(id);
            if (message is null) return NotFound();

            _context.ContactMessages.Remove(message);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
