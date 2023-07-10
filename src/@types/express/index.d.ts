import { JwtUserDto } from 'src/auth/dto/jwt-user.dto';


declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtUserDto
  }
}