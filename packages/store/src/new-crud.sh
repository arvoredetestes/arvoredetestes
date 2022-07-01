SNAKE_CASE=TEST_SCRIPT
snake_case=test-script
snakeCase=testScript
NameCase=TestScript

mkdir $snake_case
cp -r feature/* $snake_case

sed -i -e "s/FEATURE/$SNAKE_CASE/g" $snake_case/index.ts
sed -i -e "s/Feature/$NameCase/g" $snake_case/index.ts
sed -i -e "s/feature/$snakeCase/g" $snake_case/index.ts

OPS=(
"create"
"delete"
"get"
"retrieve"
"update"
)
for val in ${OPS[*]}; do
  echo "will replace for = $val"
  sed -i -e "s/FEATURE/$SNAKE_CASE/g" $snake_case/$val/index.ts
  sed -i -e "s/Feature/$NameCase/g" $snake_case/$val/index.ts
  sed -i -e "s/-feature/-$snake_case/g" $snake_case/$val/index.ts
  sed -i -e "s/feature/$snakeCase/g" $snake_case/$val/index.ts
  echo "Done replacing for = $val"
done


rm -r $snake_case/**/*.ts-e
