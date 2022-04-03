namespace TodoApi.Models
{
    public class Companies
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public virtual List<Events>? Events { get; set; }
        public virtual List<Addresses>? Addresses { get; set; }
    }
}
