export default function handler(req, res) {
    console.log(process.env.DB_HOST);
    res.statusCode = 200
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({ name: 'John Doe', env: process.env.NEXT_PUBLIC_HOME_URL }))
  }