export interface OwnerInfo {
  login: string;
  avatar_url?: string;
}

export interface RepositoryInfo {
  id: number;
  name: string;
  full_name: string;
  owner: OwnerInfo;
  description?: string;
  stargazers_url: string;
  stargazers_count: number;
}

export interface RepositoryResponse {
  total_count: number;
  items: RepositoryInfo[];
}
