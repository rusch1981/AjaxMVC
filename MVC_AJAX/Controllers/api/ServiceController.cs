using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using System.Web.Http;
using Newtonsoft.Json;

namespace MVC_AJAX.Controllers.Api
{
    public class ServiceController : ApiController
    {
        private static Dictionary<string, Task<string>> _tasks = new Dictionary<string, Task<string>>();
        //just for demo.  This will be overwritten with multiple calls
        private Person _person;

        // GET api/<controller>
        public string Get()
        {
            return "ajax text got";
        }

        // GET api/<controller>/5
        public IHttpActionResult Get(int id)
        {
            return NotFound();
        }

        // POST api/<controller>
        public IHttpActionResult Post(Person person)
        {
            Thread.Sleep(5000);
            var json = JsonConvert.SerializeObject(person);
            return Ok<string>(json);
        }
        
        [Route("api/start/task")]
        [HttpPost]
        public IHttpActionResult RegisterTask(Person person)
        {
            this._person = person;
            string taskId = Guid.NewGuid().ToString();
            _tasks[taskId] = Task.Factory.StartNew<string>(() => RunTask());
            return Ok<string>(taskId);
        }

        [Route("api/check/task")]
        [HttpGet]
        public IHttpActionResult CheckTask(string id)
        {
            if (!_tasks.ContainsKey(id))
                return NotFound();
            if (_tasks[id].IsCompleted)
                return Ok<string>("Done");
            return Ok<string>("Running");
        }

        [Route("api/result/task")]
        [HttpGet]
        public IHttpActionResult TaskResult(string id)
        {
            if (!_tasks.ContainsKey(id))
                return NotFound();
            if (_tasks[id].IsCompleted)
                Task.WaitAll(_tasks[id]);
            return Ok<string>(_tasks[id].Result);
        }

        private string RunTask()
        {
            try
            {
                Thread.Sleep(8000);
                var json = JsonConvert.SerializeObject(_person);
                return json;
            }
            catch (Exception e)
            {
                return "Error:" + e.Message;
            }
        }
    }
}