import { useAuth } from 'app/provider/AuthProvider'
import { TextLink } from 'solito/link'
import { Button } from 'app/components/Button'
import { useEffect, useState } from 'react'
import { useRouter } from 'solito/router'
import { Text, View } from 'universal'
import { colors, styled, tw } from 'universal/tailwind'
import { ScrollView, TextInput } from 'react-native'
import { routes } from 'app/navigation/routePaths'

const Card = styled(View, 'shadow-sm mb-4 p-6 max-w-lg w-full')
const Input = styled(TextInput, 'shadow-sm py-2 px-2')

export function LoginScreen() {
  const router = useRouter()
  const { isAuthenticated, signIn, signInLoading, errorMessage } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      router.push(routes.home.getPath())
    }
  }, [router, isAuthenticated])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <ScrollView style={tw`bg-white`}>
      <View className="flex-1 items-center justify-center p-4">
        <Card className="shadow-none">
          <Text className="mb-4 text-2xl font-bold">Login</Text>
          <Input
            placeholder="Email"
            placeholderTextColor={colors.gray[500]}
            autoCapitalize="none"
            style={tw`bg-indigo-50 shadow-sm rounded-sm h-12 py-2 px-2`}
            onChangeText={setEmail}
          ></Input>
          <View tw="mb-2" />
          <Input
            placeholder="Password"
            placeholderTextColor={colors.gray[500]}
            autoCapitalize="none"
            secureTextEntry
            style={tw`bg-indigo-50 shadow-sm border-0 rounded-sm h-12 py-2 px-2`}
            onChangeText={setPassword}
          ></Input>

          {errorMessage && (
            <Text className="my-2 text-center text-red-600">
              {errorMessage}
            </Text>
          )}
          <View className="mt-4 flex items-center">
            <Button
              className="text-white font-bold shadpw-lg flex h-12 w-full items-center justify-center rounded-sm border-0 bg-indigo-500 text-center text-white"
              textStyle={tw`text-white font-bold shadpw-lg text-center flex justify-center items-center`}
              disabled={signInLoading}
              isLoading={signInLoading}
              onPress={() => {
                signIn({ email, password })
              }}
            >
              Login
            </Button>
          </View>

          <View tw="mt-4 items-center">
            <TextLink
              href={routes.signUp.getPath()}
              textProps={{
                style: tw`text-indigo-800 text-base`,
              }}
            >
              Don&apos;t have an account? Sign up here.
            </TextLink>
          </View>
        </Card>
      </View>
    </ScrollView>
  )
}
