import { Text, View } from 'react-native';
import { EmptyState } from './empty-state';
import { PrimaryButton } from './primary-button';
import { SectionCard } from './section-card';

type QueryStateCardProps = {
  title: string;
  description: string;
  mode: 'loading' | 'error';
  retryLabel?: string;
  onRetry?: () => void;
};

export function QueryStateCard({
  title,
  description,
  mode,
  retryLabel = 'Try again',
  onRetry
}: QueryStateCardProps) {
  return (
    <SectionCard title={mode === 'loading' ? 'Loading skeleton data' : 'Unable to load skeleton data'}>
      <EmptyState title={title} description={description} />
      {mode === 'loading' ? <Text>Fetching demo-mode data through the app-local repository.</Text> : null}
      {mode === 'error' && onRetry ? (
        <View>
          <PrimaryButton label={retryLabel} onPress={onRetry} />
        </View>
      ) : null}
    </SectionCard>
  );
}
