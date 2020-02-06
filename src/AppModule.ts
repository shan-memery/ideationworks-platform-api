import { Module }                  from '@nestjs/common';
import { JwtModule }               from '@nestjs/jwt';
import { TypeOrmModule }           from '@nestjs/typeorm';
import { CategoriesController }    from './categories/CategoriesController';
import { CategoriesService }       from './categories/CategoriesService';
import { Category }                from './categories/Category';
import { CategoryRepository }      from './categories/CategoryRepository';
import { Organization }            from './organizations/Organization';
import { OrganizationRepository }  from './organizations/OrganizationRepository';
import { OrganizationsController } from './organizations/OrganizationsController';
import { OrganizationsService }    from './organizations/OrganizationsService';
import { User }                    from './users/User';
import { UserRepository }          from './users/UserRepository';
import { UsersController }         from './users/UsersController';
import { UsersService }            from './users/UsersService';

@Module({

    imports: [

        JwtModule.register({ secret: 'changeme' }),

        TypeOrmModule.forRoot({

            type: 'mysql',
            host: process.env.DB_HOSTNAME || 'localhost',
            port: Number.parseInt(process.env.DB_PORT) || 3306,
            username: process.env.DB_USERNAME || 'root',
            password: process.env.DB_PASSWORD || 'mysql',
            database: process.env.DB_NAME || 'ideationworks',
            synchronize: process.env.DB_SYNCHRONIZE === 'true' || true,
            keepConnectionAlive: true,
            entities: [

                Category,
                User,
                Organization,

            ]

        }),

        TypeOrmModule.forFeature([

            CategoryRepository,
            UserRepository,
            OrganizationRepository

        ])

    ],

    controllers: [

        CategoriesController,
        OrganizationsController,
        UsersController

    ],

    providers: [

        CategoriesService,
        OrganizationsService,
        UsersService

    ],

})
export class AppModule {

}