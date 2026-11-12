export type ViewId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export interface StackEntry {
  viewNumber: ViewId;
  title: string;
  subtitle?: string;
  params?: Record<string, any>;
}

export const INITIAL_STACK: StackEntry[] = [
  {
    viewNumber: 1,
    title: 'Urban Axis Design & DPH',
    subtitle: 'Mahavir Akhada, Deoghar'
  }
];

export const VIEW_TITLES: Record<ViewId, { title: string; subtitle: string }> = {
  1: { title: 'Urban Axis Design & DPH', subtitle: 'Mahavir Akhada, Deoghar' },
  2: { title: 'Search Interior & Panel Catalog', subtitle: 'Best Price & Quality Guarantee' },
  3: { title: 'Modular Kitchen Studio', subtitle: 'Designer Quartz & Modular Cabinets' },
  4: { title: 'Luxury Living & Bedroom Suites', subtitle: 'Fluted Panels & UV Marble TV Units' },
  5: { title: 'Commercial & Architectural Planning', subtitle: 'House Plans & 3D Elevations' },
  6: { title: 'Verified Google Client Reviews', subtitle: '4.9 ★ (68 Verified Reviews)' },
  7: { title: 'Live Location & GPS Navigation', subtitle: 'Mahavir Akhada, Near New Nagar Nigam' },
  8: { title: 'Materials & Panels Gallery', subtitle: 'PVC, WPC, Fluted & UV Marble' }
};

export function pushView(
  currentStack: StackEntry[],
  viewNumber: ViewId,
  params?: Record<string, any>
): StackEntry[] {
  // If the top view is already this view, do not duplicate
  const top = currentStack[currentStack.length - 1];
  if (top && top.viewNumber === viewNumber) {
    return currentStack;
  }

  const meta = VIEW_TITLES[viewNumber];
  const newEntry: StackEntry = {
    viewNumber,
    title: meta.title,
    subtitle: meta.subtitle,
    params
  };

  return [...currentStack, newEntry];
}

export function popView(currentStack: StackEntry[]): StackEntry[] {
  if (currentStack.length <= 1) {
    return currentStack;
  }
  return currentStack.slice(0, currentStack.length - 1);
}

export function resetToHome(): StackEntry[] {
  return [...INITIAL_STACK];
}

export function canGoBack(stack: StackEntry[]): boolean {
  return stack.length > 1;
}

export function getActiveView(stack: StackEntry[]): StackEntry {
  return stack[stack.length - 1] || INITIAL_STACK[0];
}
