using System;
namespace TourManagement.API.Dtos
{
    // Use abstract to not allow to use this class direct
    public abstract class TourAbstractBase
    {
        public string Title { get; set; }
        public virtual string Description { get; set; }
        public DateTimeOffset StartDate { get; set; }
        public DateTimeOffset EndDate { get; set; }
    }
}
