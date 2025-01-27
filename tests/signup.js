import http from 'k6/http'
import { sleep, check } from 'k6'

export const options = {
    vus: 10,
    durations: '30s',
    thresholds: {
        http_req_duration: ['p(95)<2000']
    }
}

export default function () {
    
    const url = 'http://localhost:3333/signup'
    
    const payload = JSON.stringify(
        {email: 'papito@yahoo.com', password: 'pwd123'}
    )
  
    const headers = {
        'headers': { 'Content-Type': 'application/json'
    }
}

    const res = http.post(url, payload, headers)

    console.log(res.body)

    check(res,{
        'Status should be 201': (r) => r.status === 201
     })

        sleep(1);

    }
