export interface Project {
  id: number;
  code: string;
  name: string;
  municipality: string;
  department: string;
  start_date: string;
  end_date: string;
};

export interface ProjectList {
  projects: Project[],
  totalItems: number;
};

export interface Department {
  name: string;
  municipalities: string[];
}
