import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { CartItem } from '../backend';

export function useCart() {
  const { actor, isFetching } = useActor();

  return useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.viewCart();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useCartTotal() {
  const { actor, isFetching } = useActor();

  return useQuery<bigint>({
    queryKey: ['cart-total'],
    queryFn: async () => {
      if (!actor) return BigInt(0);
      return actor.getCartTotal();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useAddToCart() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ productId, quantity }: { productId: bigint; quantity: bigint }) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.addToCart(productId, quantity);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      queryClient.invalidateQueries({ queryKey: ['cart-total'] });
    },
  });
}
