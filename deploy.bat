call ng build --prod --baseHref ./ --deployUrl /smart/
call cd dist/smart-front
call jar -cvf smart.war *
call cd ../..
