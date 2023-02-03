import config from '../constants/config';
import { RepositoryResponse } from '../models/RepositoryResponse';
import { Stargazer } from '../models/Stargazer';
import { Network } from '../utils/Network';

export interface RequestStargazer {
  userRepo: string;
  repoName: string;
  page?: number;
  totalItems?: number;
}

export const GithubServices = {
  /**
   * Search a repository in a "like" mode by text */
  findRepositories: (
    text: string | undefined,
    page?: number,
    totalItems: number = config.defaultTotalItemsPerPage,
  ) => {
    return Network.get<RepositoryResponse>(`search/repositories`, {
      params: {
        q: text,
        per_page: totalItems,
        page,
        sort: 'stars',
      },
    });
  },
  /**
   * Retrieves all the stargazers of a repository */
  getRepoStargazers: ({
    userRepo,
    repoName,
    page,
    totalItems = config.defaultTotalItemsPerPage,
  }: RequestStargazer) => {
    return Network.get<Stargazer[]>(`repos/${userRepo}/${repoName}/stargazers`, {
      headers: {
        Accept: 'application/vnd.github.star+json',
      },
      params: {
        per_page: totalItems,
        page,
      },
    });
  },
};

export default GithubServices;
