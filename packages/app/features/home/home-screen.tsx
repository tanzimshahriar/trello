import { TextLink } from 'solito/link'
import {
  AuthenticatedOnly,
  UnauthenticatedOnly,
  useAuth,
} from 'app/provider/AuthProvider'
import { Button } from 'app/components/Button'
import { Text, View } from 'universal'
import { routes } from 'app/navigation/routePaths'
import { tw } from 'universal/tailwind'

export function HomeScreen() {
  const { user, logout } = useAuth()

  return (
    <View className="flex-1">
      <View className="flex-1 justify-center items-center p-4">
        <Text className="font-extrabold text-3xl text-center items-center">
          Welcome to Trello clone {user?.email}
        </Text>
        <View className="h-8" />

        <UnauthenticatedOnly>
          <TextLink
            href={routes.login.getPath()}
            textProps={{
              style: tw`text-base font-bold text-blue-700 mb-2`,
            }}
          >
            Login
          </TextLink>
        </UnauthenticatedOnly>
        <AuthenticatedOnly>
          <>
            <TextLink
              href={routes.postList.getPath()}
              textProps={{
                style: tw`text-base font-bold text-blue-700 mb-6`,
              }}
            >
              Go to blog posts
            </TextLink>
            <Button
              onPress={async () => {
                try {
                  logout()
                } catch (err) {}
              }}
            >
              Logout
            </Button>
          </>
        </AuthenticatedOnly>
      </View>
    </View>
  )
}
