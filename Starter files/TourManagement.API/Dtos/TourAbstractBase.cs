using System;
using System.ComponentModel.DataAnnotations;

namespace TourManagement.API.Dtos
{
    // Use abstract to not allow to use this class direct
    public abstract class TourAbstractBase
    {
        [Required(AllowEmptyStrings = false, ErrorMessage = "Title is required.")]
        [MaxLength(200, ErrorMessage = "Title is too long.")]
        public string Title { get; set; }
        public virtual string Description { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
    }
}
