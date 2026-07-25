namespace Malek.Portfolio.Api.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Title { get; set; } = string.Empty;
        public string Tagline { get; set; } = string.Empty;
        public string Bio { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string ExperienceYears { get; set; } = string.Empty;
        public string Availability { get; set; } = string.Empty;
        public string CvUrl { get; set; } = string.Empty;
        public string GitHubUrl { get; set; } = string.Empty;
        public string LinkedInUrl { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
    }
}
