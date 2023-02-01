import config from '../constants/config';
import { RepositoryResponse } from '../models/RepositoryResponse';
import { Network } from '../utils/Network';

const basePath = 'search';

const GithubServices = {
  findRepositories: (
    text: string | undefined,
    page?: number,
    totalItems: number = config.defaultTotalItemsPerPage,
  ) => {
    return Network.get<RepositoryResponse>(`${basePath}/repositories`, {
      params: {
        q: text,
        per_page: totalItems,
        page,
        sort: 'stars',
      },
    });
  },
};

export default GithubServices;
