import config from '../constants/config';
import { RepositoryResponse } from '../models/RepositoryResponse';
import { Network } from '../utils/Network';

const basePath = 'search';

const GithubServices = {
  findRepositories: (
    text: string,
    currentPage: number,
    totalItems: number = config.defaultTotalItemsPerPage,
  ) =>
    Network.get<RepositoryResponse>(`${basePath}/repositories`, {
      params: {
        q: text,
        per_page: totalItems,
        page: currentPage,
      },
    }),
};

export default GithubServices;
