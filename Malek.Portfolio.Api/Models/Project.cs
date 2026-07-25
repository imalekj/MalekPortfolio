namespace Malek.Portfolio.Api.Models
{
    public class Project
    {
        public int Id { get; set; }
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public string TechnologiesCsv { get; set; } = string.Empty;
        public string GitHubUrl { get; set; } = string.Empty;
        public string LiveUrl { get; set; } = string.Empty;
        public int Order { get; set; }
        public bool Featured { get; set; }
    }
}
