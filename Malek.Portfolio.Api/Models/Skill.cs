namespace Malek.Portfolio.Api.Models
{
    public class Skill
    {
        public int Id { get; set; }
        public SkillCategory Category { get; set; }
        public string Name { get; set; } = string.Empty;
        public int Order { get; set; }
    }
}
