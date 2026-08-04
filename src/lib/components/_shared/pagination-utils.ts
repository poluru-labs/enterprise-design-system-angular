export function range(start: number, end: number): number[] {
  const values: number[] = [];
  for (let index = start; index <= end; index += 1) {
    values.push(index);
  }
  return values;
}

export type PaginationItem = number | 'ellipsis';

export function buildPaginationItems(
  current: number,
  total: number,
  siblingCount: number,
): PaginationItem[] {
  if (total <= 1) {
    return total === 1 ? [1] : [];
  }

  const totalNumbers = siblingCount * 2 + 5;
  if (total <= totalNumbers) {
    return range(1, total);
  }

  const leftSibling = Math.max(current - siblingCount, 1);
  const rightSibling = Math.min(current + siblingCount, total);
  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < total - 1;

  if (!showLeftEllipsis && showRightEllipsis) {
    const leftRange = range(1, 3 + siblingCount * 2);
    return [...leftRange, 'ellipsis', total];
  }

  if (showLeftEllipsis && !showRightEllipsis) {
    const rightRange = range(total - (2 + siblingCount * 2), total);
    return [1, 'ellipsis', ...rightRange];
  }

  if (showLeftEllipsis && showRightEllipsis) {
    const middleRange = range(leftSibling, rightSibling);
    return [1, 'ellipsis', ...middleRange, 'ellipsis', total];
  }

  return range(1, total);
}
