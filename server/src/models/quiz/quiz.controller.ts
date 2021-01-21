import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, UseGuards, Req } from '@nestjs/common';
import { UserAuth } from '../../auth/auth.guard';
import { JoiValidatorPipe } from '../../common/validation/validator.pipe';
import { CreateQuizDto, vCreateQuizDto } from './dto/createQuiz.dto';
import { Request } from 'express';
import { QuizService } from './quiz.service';
import { ApiResponse } from '../../common/interfaces/ApiResponse';
import { ErrorResponse } from '../../common/interfaces/ErrorResponse';

@Controller('quiz')
export class QuizController {
        constructor(private readonly quizService: QuizService) {}

        @Post('/')
        @UsePipes(new JoiValidatorPipe(vCreateQuizDto))
        @UseGuards(UserAuth)
        async createNewQuiz(@Body() body: CreateQuizDto, @Req() req: Request): Promise<ApiResponse> {
                const isExist = await this.quizService.findQuizByField('name', body.name);
                if (isExist) throw ErrorResponse.send({ details: { name: 'is taken' } }, 'BadRequestException');

                await this.quizService.saveQuiz(body, req.user._id);

                return { message: 'Create new quiz success' };
        }
}
