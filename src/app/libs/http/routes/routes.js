import userRouter from '../../../../modules/user/routes/routes.js';

export default {
  v1: [
    {
      path: '/user',
      handler: userRouter,
    },
  ],
};
