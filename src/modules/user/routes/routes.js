import {Router} from 'express';

const userRouter = Router({mergeParams: true});

userRouter.get('/', (req, res) => {
  res.status(200).json({
    name: 'Ciro',
    lastName: 'Esposito',
    age: 29,
    email: 'cicciobacucco@cicciobacucco.com',
    password: 'dlblflqnfqnpc',
  });
});

export default userRouter;
