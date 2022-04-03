using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace TodoApi.Models
{
    public class LoginHistory
    {
        public long Id { get; set; }
        DateTime Date { get; set; }
        public virtual Users Users { get; set; }
    }
}
