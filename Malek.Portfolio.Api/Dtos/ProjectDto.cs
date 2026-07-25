namespace Malek.Portfolio.Api.Dtos
{
    public class ProjectDto
    {
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string ImageUrl { get; set; } = string.Empty;
        public List<string> Technologies { get; set; } = new();
        public string GitHubUrl { get; set; } = string.Empty;
        public string LiveUrl { get; set; } = string.Empty;
        public int Order { get; set; }
        public bool Featured { get; set; }
    }
}
