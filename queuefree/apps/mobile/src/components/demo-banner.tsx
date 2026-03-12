import { StyleSheet, Text, View } from 'react-native';
import { mobileTheme } from '@queuefree/ui-tokens';
import { getMobileReadAdapterStatusSummary } from '../adapters/mobile-read-adapter.resolve';
import { getRuntimeConfigAdapterStatusSummary } from '../adapters/runtime-config-adapter.resolve';

export function DemoBanner() {
 const screenDataStatus = getMobileReadAdapterStatusSummary();
 const runtimeConfigStatus = getRuntimeConfigAdapterStatusSummary();

 return (
 <View style={styles.banner}>
 <Text style={styles.title}>Demo mode</Text>
 <Text style={styles.text}>
 Screen data: {screenDataStatus.screenDataMode} · Runtime config: {runtimeConfigStatus.runtimeConfigMode} · api-client:{' '}
 {screenDataStatus.apiClientRuntimeMode} · screen-model validation: active
 </Text>
 {screenDataStatus.reasons.map((reason) => (
 <Text key={`screen-${reason}`} style={styles.bullet}>
 • {reason}
 </Text>
 ))}
 {runtimeConfigStatus.reasons
 .filter((reason) => !screenDataStatus.reasons.includes(reason))
 .map((reason) => (
 <Text key={`runtime-${reason}`} style={styles.bullet}>
 • {reason}
 </Text>
 ))}
 </View>
 );
}

const styles = StyleSheet.create({
 banner: {
 backgroundColor: mobileTheme.colors.infoSoft,
 borderRadius: mobileTheme.radius.md,
 padding: mobileTheme.spacing.md,
 gap: mobileTheme.spacing.xs
 },
 title: {
 color: mobileTheme.colors.info,
 fontWeight: '700'
 },
 text: {
 color: mobileTheme.colors.textSecondary,
 fontSize: 13,
 lineHeight: 18
 },
 bullet: {
 color: mobileTheme.colors.textSecondary,
 fontSize: 12,
 lineHeight: 17
 }
});
