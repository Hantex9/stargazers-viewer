import { OwnerInfo } from './RepositoryResponse';

export interface Stargazer {
  starred_at: Date;
  user: OwnerInfo;
}
