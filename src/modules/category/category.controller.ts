import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import CreateCategoryDto from './dto/create-category.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import UpdateCategoryDto from './dto/update-category.dto';
import UserGuard from '../user/user.guard';
import { extname } from 'path';
import { diskStorage } from 'multer';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('add-category')
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload',
        filename: editFileName,
      }),
    }),
  )
  addCategory(
    @UploadedFile() file: Express.Multer.File,
    @Body() body: CreateCategoryDto,
    @Req() request: Express.Request,
  ) {
    console.log(request['user']);
    return this.categoryService.addCategory(file.path, body);
  }

  @Patch('update-category/:id')
  @UseGuards(UserGuard)
  updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoryService.updateCategory(+id, body);
  }

  @Patch('update-category-image/:id')
  @UseGuards(UserGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'upload',
        filename: editFileName,
      }),
    }),
  )
  updateCategoryImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.categoryService.updateCategoryImage(+id, file.path);
  }

  @Get()
  getAllCategory() {
    return this.categoryService.getAll();
  }

  @Delete('delete-category/:id')
  @UseGuards(UserGuard)
  deleteCategory(@Param('id') id: string) {
    return this.categoryService.deleteCategory(+id);
  }
}

export const editFileName = (req, file, callback) => {
  const name = file.originalname.split('.')[0];
  const fileExtName = extname(file.originalname);
  const randomName = Array(4)
    .fill(null)
    .map(() => Math.round(Math.random() * 16).toString(16))
    .join('');
  callback(null, `${name}-${randomName}${fileExtName}`);
};
