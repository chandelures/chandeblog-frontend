import { Pagination, PaginationItem, Link } from "@mui/material";

interface PaginatorProps {
  count: number;
  page: number;
}

export default function Paginator(props: PaginatorProps) {
  const { count, page } = props;
  return (
    <Pagination
      count={count}
      color="primary"
      page={page}
      size="large"
      renderItem={(item) => (
        <PaginationItem
          component={Link}
          href={`/${item.page === 1 ? "" : `?page=${item.page}`}`}
          {...item}
        />
      )}
    />
  );
}
