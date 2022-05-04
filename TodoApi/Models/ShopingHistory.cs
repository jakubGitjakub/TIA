using Microsoft.EntityFrameworkCore;

namespace TodoApi.Models
{
    public class ShopingHistory
    {
        public long Id { get; set; }
        public DateTime? Date { get; set; }
        public string? Ticket { get; set; }
        public int? Count_Ticket { get; set; }
        public virtual Users? User { get; set; }
    }
}
