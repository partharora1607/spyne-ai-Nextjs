import { handleGetRequest } from './handleGetReq';
import { handlePostRequest } from './handlePostReq';
import { handleDeleteRequest } from './handleDeleteReq';
import { handlePatchRequest } from './handlePatchReq';
const CentralAPIHandler = {
    handleGetRequest,
    handlePostRequest,
    handleDeleteRequest,
    handlePatchRequest
}


export default CentralAPIHandler;