using Malek.Portfolio.Api.Data;
using Malek.Portfolio.Api.Dtos;
using Malek.Portfolio.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Malek.Portfolio.Api.Controllers
{
    [ApiController]
    [Route("api/skills")]
    public class SkillsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SkillsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Skill>>> GetAll()
        {
            var skills = await _context.Skills
                .OrderBy(s => s.Category).ThenBy(s => s.Order)
                .ToListAsync();
            return Ok(skills);
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Skill>> Create(SkillDto dto)
        {
            var skill = new Skill
            {
                Category = Enum.Parse<SkillCategory>(dto.Category, true),
                Name = dto.Name,
                Order = dto.Order
            };
            _context.Skills.Add(skill);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = skill.Id }, skill);
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult<Skill>> Update(int id, SkillDto dto)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill is null) return NotFound();

            skill.Category = Enum.Parse<SkillCategory>(dto.Category, true);
            skill.Name = dto.Name;
            skill.Order = dto.Order;

            await _context.SaveChangesAsync();
            return Ok(skill);
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> Delete(int id)
        {
            var skill = await _context.Skills.FindAsync(id);
            if (skill is null) return NotFound();

            _context.Skills.Remove(skill);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
