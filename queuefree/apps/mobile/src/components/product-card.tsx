import { StyleSheet, Text, View } from "react-native";
import { mobileTheme } from "@queuefree/ui-tokens";
import { formatMinorMoney } from "@queuefree/shared";
import type { ProductCardModel } from "../models/mobile-screen-models";
import { PromoBadge } from "./promo-badge";
import { PrimaryButton } from "./primary-button";

type ProductCardProps = {
  product: ProductCardModel;
  variant?: "default" | "promoted";
  onPress?: () => void;
};

export function ProductCard({ product, variant = "default", onPress }: ProductCardProps) {
  return (
    <View style={[styles.card, variant === "promoted" ? styles.cardPromoted : null]}>
      <View style={[styles.media, variant === "promoted" ? styles.mediaPromoted : null]}>
        <PromoBadge label={variant === "promoted" ? "Featured today" : "Queue eligible"} />
        <Text style={styles.mediaTitle}>{product.title}</Text>
        <Text style={styles.mediaSubtitle}>{product.subtitle}</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.priceRow}>
          <View style={styles.priceCopy}>
            <Text style={styles.priceLabel}>Price</Text>
            <Text style={styles.priceValue}>{formatMinorMoney(product.priceMinor)}</Text>
          </View>
          <View style={styles.capCopy}>
            <Text style={styles.capLabel}>Cashback cap</Text>
            <Text style={styles.capValue}>{formatMinorMoney(product.cashbackCapMinor)}</Text>
          </View>
        </View>

        <Text style={styles.stock}>{product.stockLabel}</Text>
        <PrimaryButton
          label="View product"
          variant={variant === "promoted" ? "promo" : "brand"}
          onPress={onPress}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: mobileTheme.radius.xl,
    backgroundColor: mobileTheme.colors.surface,
    borderWidth: 1,
    borderColor: mobileTheme.colors.border,
    overflow: "hidden",
    shadowColor: "#0F172A",
    shadowOpacity: 0.05,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 8 },
    elevation: 1
  },
  cardPromoted: {
    borderColor: "rgba(255, 138, 112, 0.24)"
  },
  media: {
    minHeight: 168,
    padding: mobileTheme.spacing.lg,
    justifyContent: "space-between",
    backgroundColor: mobileTheme.colors.surfaceMuted
  },
  mediaPromoted: {
    backgroundColor: mobileTheme.promo.softBackground
  },
  mediaTitle: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "800"
  },
  mediaSubtitle: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 19
  },
  body: {
    padding: mobileTheme.spacing.md,
    gap: mobileTheme.spacing.sm
  },
  priceRow: {
    flexDirection: "row",
    gap: mobileTheme.spacing.md
  },
  priceCopy: {
    flex: 1,
    gap: 4
  },
  capCopy: {
    flex: 1,
    gap: 4
  },
  priceLabel: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "700"
  },
  priceValue: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 20,
    fontWeight: "800"
  },
  capLabel: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 12,
    fontWeight: "700"
  },
  capValue: {
    color: mobileTheme.colors.textPrimary,
    fontSize: 16,
    fontWeight: "800"
  },
  stock: {
    color: mobileTheme.colors.textSecondary,
    fontSize: 13,
    lineHeight: 18
  }
});
