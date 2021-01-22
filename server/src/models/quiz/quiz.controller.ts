import { Controller, Post, Body, Put, Param, Delete, UsePipes, UseGuards, Req, ValidationPipe, Get } from '@nestjs/common';
import { UserAuth } from '../../auth/auth.guard';
import { JoiValidatorPipe } from '../../common/validation/validator.pipe';
import { CreateQuizDto, vCreateQuizDto } from './dto/createQuiz.dto';
import { Request } from 'express';
import { QuizService } from './quiz.service';
import { ApiResponse } from '../../common/interfaces/ApiResponse';
import { ErrorResponse } from '../../common/interfaces/ErrorResponse';
import { Quiz } from './entities/quiz.entity';
import { UserService } from '../user/user.service';

@Controller('quiz')
export class QuizController {
        constructor(private readonly quizService: QuizService, private readonly userService: UserService) {}

        @Get('/')
        @UseGuards(UserAuth)
        async getAllQuizOfUser(@Req() req: Request) {
                return await this.quizService.getQuizByIds(req.user.quizIds);
        }

        @Post('/')
        @UsePipes(new JoiValidatorPipe(vCreateQuizDto))
        @UseGuards(UserAuth)
        async createNewQuiz(@Body() body: CreateQuizDto, @Req() req: Request): Promise<ApiResponse> {
                const isExist = await this.quizService.getOneFindField('name', body.name);
                if (isExist) throw ErrorResponse.send({ details: { name: 'is taken' } }, 'BadRequestException');

                const quiz = new Quiz();
                quiz.name = body.name;
                quiz.questions = body.questions;
                quiz.userId = req.user._id;
                const newQuiz = await this.quizService.updateOrSave(quiz);
                req.user.quizIds.push(newQuiz._id);
                await this.userService.updateOrSave(req.user);

                return { message: 'Create new quiz success' };
        }

        @Put('/:id')
        @UseGuards(UserAuth)
        async updateQuiz(@Body(new JoiValidatorPipe(vCreateQuizDto)) body: CreateQuizDto, @Param('id') id: string, @Req() req: Request): Promise<ApiResponse> {
                const quiz = await this.quizService.getOneFindField('_id', id);
                if (!quiz) throw ErrorResponse.send({ message: 'Quiz with the given Id was not found' }, 'BadRequestException');

                const isOwner = quiz.userId.equals(req.user._id);
                if (!isOwner) throw ErrorResponse.send({ message: 'Invalid user' }, 'UnauthorizedException');
                quiz.name = body.name;
                quiz.questions = body.questions;

                await this.quizService.updateOrSave(quiz);
                return { message: 'Update quiz success' };
        }

        @Delete('/:id')
        @UseGuards(UserAuth)
        async deleteQuiz(@Param('id') id: string, @Req() req: Request): Promise<ApiResponse> {
                const quiz = await this.quizService.getOneFindField('_id', id);
                if (!quiz) throw ErrorResponse.send({ message: 'Quiz with the given Id was not found' }, 'BadRequestException');

                const isOwner = quiz.userId.equals(req.user._id);
                if (!isOwner) throw ErrorResponse.send({ message: 'Invalid user' }, 'UnauthorizedException');

                await this.quizService.deleteOneQuiz(quiz);
                return { message: 'Delete quiz success' };
        }
}
