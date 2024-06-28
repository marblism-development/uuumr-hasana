/* eslint-disable */
import { type RouterFactory, type ProcBuilder, type BaseConfig, db } from ".";
import * as _Schema from '@zenstackhq/runtime/zod/input';
const $Schema: typeof _Schema = (_Schema as any).default ?? _Schema;
import { checkRead, checkMutate } from '../helper';
import type { Prisma } from '@prisma/client';
import type { UseTRPCMutationOptions, UseTRPCMutationResult, UseTRPCQueryOptions, UseTRPCQueryResult, UseTRPCInfiniteQueryOptions, UseTRPCInfiniteQueryResult } from '@trpc/react-query/shared';
import type { TRPCClientErrorLike } from '@trpc/client';
import type { AnyRouter } from '@trpc/server';

export default function createRouter<Config extends BaseConfig>(router: RouterFactory<Config>, procedure: ProcBuilder<Config>) {
    return router({

        create: procedure.input($Schema.VerificationTokenInputSchema.create).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.create(input as any))),

        delete: procedure.input($Schema.VerificationTokenInputSchema.delete).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.delete(input as any))),

        findFirst: procedure.input($Schema.VerificationTokenInputSchema.findFirst).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.findFirst(input as any))),

        findMany: procedure.input($Schema.VerificationTokenInputSchema.findMany).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.findMany(input as any))),

        findUnique: procedure.input($Schema.VerificationTokenInputSchema.findUnique).query(({ ctx, input }) => checkRead(db(ctx).verificationToken.findUnique(input as any))),

        update: procedure.input($Schema.VerificationTokenInputSchema.update).mutation(async ({ ctx, input }) => checkMutate(db(ctx).verificationToken.update(input as any))),

    }
    );
}

export interface ClientType<AppRouter extends AnyRouter, Context = AppRouter['_def']['_config']['$types']['ctx']> {
    create: {

        useMutation: <T extends Prisma.VerificationTokenCreateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VerificationTokenCreateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.VerificationTokenGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.VerificationTokenGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VerificationTokenCreateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VerificationTokenCreateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.VerificationTokenGetPayload<T>, Context>) => Promise<Prisma.VerificationTokenGetPayload<T>>
            };

    };
    delete: {

        useMutation: <T extends Prisma.VerificationTokenDeleteArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VerificationTokenDeleteArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.VerificationTokenGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.VerificationTokenGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VerificationTokenDeleteArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VerificationTokenDeleteArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.VerificationTokenGetPayload<T>, Context>) => Promise<Prisma.VerificationTokenGetPayload<T>>
            };

    };
    findFirst: {

        useQuery: <T extends Prisma.VerificationTokenFindFirstArgs, TData = Prisma.VerificationTokenGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.VerificationTokenFindFirstArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.VerificationTokenGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.VerificationTokenFindFirstArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.VerificationTokenFindFirstArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.VerificationTokenGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.VerificationTokenGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findMany: {

        useQuery: <T extends Prisma.VerificationTokenFindManyArgs, TData = Array<Prisma.VerificationTokenGetPayload<T>>>(
            input: Prisma.SelectSubset<T, Prisma.VerificationTokenFindManyArgs>,
            opts?: UseTRPCQueryOptions<string, T, Array<Prisma.VerificationTokenGetPayload<T>>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.VerificationTokenFindManyArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.VerificationTokenFindManyArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Array<Prisma.VerificationTokenGetPayload<T>>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Array<Prisma.VerificationTokenGetPayload<T>>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    findUnique: {

        useQuery: <T extends Prisma.VerificationTokenFindUniqueArgs, TData = Prisma.VerificationTokenGetPayload<T>>(
            input: Prisma.SelectSubset<T, Prisma.VerificationTokenFindUniqueArgs>,
            opts?: UseTRPCQueryOptions<string, T, Prisma.VerificationTokenGetPayload<T>, TData, Error>
        ) => UseTRPCQueryResult<
            TData,
            TRPCClientErrorLike<AppRouter>
        >;
        useInfiniteQuery: <T extends Prisma.VerificationTokenFindUniqueArgs>(
            input: Omit<Prisma.SelectSubset<T, Prisma.VerificationTokenFindUniqueArgs>, 'cursor'>,
            opts?: UseTRPCInfiniteQueryOptions<string, T, Prisma.VerificationTokenGetPayload<T>, Error>
        ) => UseTRPCInfiniteQueryResult<
            Prisma.VerificationTokenGetPayload<T>,
            TRPCClientErrorLike<AppRouter>
        >;

    };
    update: {

        useMutation: <T extends Prisma.VerificationTokenUpdateArgs>(opts?: UseTRPCMutationOptions<
            Prisma.VerificationTokenUpdateArgs,
            TRPCClientErrorLike<AppRouter>,
            Prisma.VerificationTokenGetPayload<T>,
            Context
        >,) =>
            Omit<UseTRPCMutationResult<Prisma.VerificationTokenGetPayload<T>, TRPCClientErrorLike<AppRouter>, Prisma.SelectSubset<T, Prisma.VerificationTokenUpdateArgs>, Context>, 'mutateAsync'> & {
                mutateAsync:
                <T extends Prisma.VerificationTokenUpdateArgs>(variables: T, opts?: UseTRPCMutationOptions<T, TRPCClientErrorLike<AppRouter>, Prisma.VerificationTokenGetPayload<T>, Context>) => Promise<Prisma.VerificationTokenGetPayload<T>>
            };

    };
}
