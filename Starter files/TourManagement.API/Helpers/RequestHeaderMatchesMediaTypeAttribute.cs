using System;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ActionConstraints;

namespace TourManagement.API.Helpers
{
    [AttributeUsage(AttributeTargets.All, Inherited = true, AllowMultiple = true)]
    public class RequestHeaderMatchesMediaTypeAttribute : Attribute, IActionConstraint
    {
        private readonly string requestHeaderToMatch;
        private readonly string[] mediaTypes;

        public RequestHeaderMatchesMediaTypeAttribute(string requestHeaderToMatch, string[] mediaTypes)
        {
            this.requestHeaderToMatch = requestHeaderToMatch;
            this.mediaTypes = mediaTypes;
        }

        public int Order
        {
            get { return 0; }
        }

        public bool Accept(ActionConstraintContext context)
        {
            var requestHeaders = context.RouteContext.HttpContext.Request.Headers;

            if (!requestHeaders.ContainsKey(this.requestHeaderToMatch))
            {
                return false;
            }

            foreach (var mediaType in this.mediaTypes)
            {
                var headerValues = requestHeaders[this.requestHeaderToMatch].ToString().Split(',').ToList();

                foreach (var headerValue in headerValues)
                {
                    if (string.Equals(headerValue, mediaType, StringComparison.OrdinalIgnoreCase))
                    {
                        return true;
                    }
                }
            }
            return false;
        }
    }
}
