import app from './axiosConfig';

// Fetches 10 subscribers from DB
const fetchSubscribers = () => (app.get(`subscribers`))

export {
  fetchSubscribers
}
