
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface CreateNavigation {
    name: string;
    url: string;
    icon?: string;
}

export interface UpdateNavigation {
    name?: string;
    url?: string;
    icon?: string;
}

export interface IQuery {
    hello(): string | Promise<string>;
    navigations(): Navigation[] | Promise<Navigation[]>;
    navigation(id: number): Navigation | Promise<Navigation>;
}

export interface Navigation {
    id: number;
    name: string;
    url: string;
    icon?: string;
}

export interface IMutation {
    updateNavigation(id: number, data: UpdateNavigation): Navigation | Promise<Navigation>;
    createNavigation(data?: CreateNavigation): Navigation | Promise<Navigation>;
}
