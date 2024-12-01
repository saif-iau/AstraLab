

const axios = require('axios');
const Request = require('../../models/request.model');

const makeRequest = async (req, res) => {
  const {  pageUrl, method = 'GET', headers = [], queryParams = {}, body = {}, description = '' } = req.body;
   const { id } = req.user;
  // Input validation
  if (!pageUrl) {
    return res.status(400).json({
      message: 'Page URL is required',
    });
  }

  const formattedHeaders = headers.reduce((acc, header) => {
    if (header.key && header.value) acc[header.key] = header.value;
    return acc;
  }, {});

  const config = {
    method,
    url: pageUrl,
    headers: formattedHeaders,
    params: queryParams,
    data: body,
  };

  try {
    const startTime = Date.now();
    const response = await axios(config);
    const responseTime = Date.now() - startTime;

    // Save request only if it was successful
    const requestData = new Request({
      creator:id,
      pageUrl,
      method,
      headers,
      queryParams,
      body,
      responseData: response.data,
      statusCode: response.status,
      responseTime,
      description,
    });

    await requestData.save();

    res.status(200).json({
      message: 'Request made successfully',
      data: {
        request: requestData,
        response: response.data,
        statusCode: response.status,
      },
    });
  } catch (error) {
    const errorStatus = error.response ? error.response.status : 500;
    const errorData = error.response ? error.response.data : 'Server error';

    console.error(`Request failed with status ${errorStatus}:`, errorData);

    res.status(errorStatus).json({
      message: 'Request failed',
      error: errorData,
    });
  }
};




const getUserRequests = async (req, res) => {
    
    const {id} = req.user;
    try {
      // Fetch all requests where the creator matches the userId
      const requests = await Request.find({ creator: id }).sort({ createdAt: -1 });
  
      if (!requests.length) {
        return res.status(404).json({ message: 'No requests found for this user.' });
      }
  
      res.status(200).json({
        message: 'User requests fetched successfully',
        data: requests
      });
    } catch (error) {
      console.error('Error fetching user requests:', error);
      res.status(500).json({ message: 'Server error while fetching user requests' });
    }
  };
module.exports = { makeRequest ,getUserRequests };
