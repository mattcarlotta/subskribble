import mailer from '@sendgrid/mail';
import { create } from 'controllers/messages';
import { missingCreationParams, unableToLocate } from 'errors';
import { loginUser, mockRequest, mockResponse } from '../../__mocks__/helpers';

describe('Create Message Controller', () => {
  let user;
  beforeAll(async () => {
    user = await loginUser();
  });

  it('handles empty body requests', async () => {
    const req = mockRequest(null, { template: '' });
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: missingCreationParams,
    });
  });

  it('handles invalid message requests', async () => {
    const req = mockRequest(user, {
      template: 'Bad Template',
    });
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      err: unableToLocate('template'),
    });
  });

  it('handles valid message requests', async () => {
    const req = mockRequest(user, {
      template: 'Partners Template',
    });
    const res = mockResponse();

    await create(req, res);
    expect(res.status).toHaveBeenCalledWith(201);
    expect(mailer.sendMultiple).toHaveBeenCalled();
  });
});
